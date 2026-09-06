import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // 1. Create States and Districts
  const statesData = [
    { name: 'Rajasthan', districts: ['Jaipur', 'Jodhpur', 'Udaipur'] },
    { name: 'Maharashtra', districts: ['Mumbai', 'Pune', 'Nagpur'] },
    { name: 'Karnataka', districts: ['Bengaluru', 'Mysuru', 'Hubli'] },
  ]

  const states = []
  const districts = []
  for (const s of statesData) {
    const state = await prisma.state.upsert({
      where: { name: s.name },
      update: {},
      create: { name: s.name },
    })
    states.push(state)
    for (const dName of s.districts) {
      const district = await prisma.district.upsert({
        where: { name_stateId: { name: dName, stateId: state.id } },
        update: {},
        create: { name: dName, stateId: state.id },
      })
      districts.push(district)
    }
  }

  // 2. Create Medicines
  const medicinesData = [
    { name: 'Paracetamol 500mg', category: 'Analgesic', unit: 'Tablet' },
    { name: 'Amoxicillin 250mg', category: 'Antibiotic', unit: 'Capsule' },
    { name: 'ORS Powder', category: 'Rehydration', unit: 'Sachet' },
    { name: 'IV Fluid (RL)', category: 'Fluid', unit: 'Bottle' },
  ]
  const medicines = []
  for (const m of medicinesData) {
    const medicine = await prisma.medicine.upsert({
      where: { name: m.name },
      update: {},
      create: m,
    })
    medicines.push(medicine)
  }

  // 3. Create Demo PHCs
  const phcsData = [
    { name: 'PHC Rampur', lat: 26.9124, lng: 75.7873, pop: 12000, districtName: 'Jaipur' }, // Critical
    { name: 'PHC Shahpur', lat: 26.8921, lng: 75.8011, pop: 8500, districtName: 'Jaipur' }, // Surplus
    { name: 'PHC Andheri', lat: 19.1136, lng: 72.8697, pop: 45000, districtName: 'Mumbai' }, // Warning
    { name: 'PHC Whitefield', lat: 12.9698, lng: 77.7499, pop: 22000, districtName: 'Bengaluru' }, // Stable
  ]

  const phcs = []
  for (const p of phcsData) {
    const d = districts.find((dist) => dist.name === p.districtName)
    const phc = await prisma.pHC.create({
      data: {
        name: p.name,
        latitude: p.lat,
        longitude: p.lng,
        population: p.pop,
        districtId: d!.id,
      },
    })
    phcs.push(phc)

    // Add Bed Capacity
    await prisma.bedCapacity.create({
      data: {
        phcId: phc.id,
        totalBeds: p.name.includes('Rampur') ? 50 : 100,
        occupiedBeds: p.name.includes('Rampur') ? 48 : 20, // Rampur is overloaded
        icuBeds: 5,
        occupiedIcu: p.name.includes('Rampur') ? 5 : 1,
      },
    })

    // Add Staff
    await prisma.staff.create({
      data: {
        phcId: phc.id,
        totalDoctors: 10,
        availableDoctors: p.name.includes('Rampur') ? 4 : 8,
        totalNurses: 20,
        availableNurses: p.name.includes('Rampur') ? 10 : 18,
      },
    })

    // Add Inventory
    for (const m of medicines) {
      let stock = 1000
      if (p.name.includes('Rampur') && m.name.includes('Amoxicillin')) {
        stock = 82 // Critical shortage
      }
      if (p.name.includes('Shahpur') && m.name.includes('Amoxicillin')) {
        stock = 1500 // Surplus
      }

      await prisma.inventory.create({
        data: {
          facility_id: phc.id,
          medicineId: m.id,
          currentStock: stock,
          dailyConsumption: p.name.includes('Rampur') ? 35 : 10,
          reorderLevel: 200,
        },
      })
    }

    // Add Risk Score
    let score = 90
    if (p.name.includes('Rampur')) score = 42
    if (p.name.includes('Andheri')) score = 68

    await prisma.riskScore.create({
      data: {
        phcId: phc.id,
        score,
        category: score < 50 ? 'CRITICAL' : score < 75 ? 'WARNING' : 'STABLE',
      },
    })
  }

  // 4. Create an Alert for Rampur
  const rampur = phcs.find((p) => p.name === 'PHC Rampur')
  if (rampur) {
    await prisma.alert.create({
      data: {
        facility_id: rampur.id,
        title: 'Medicine Shortage Predicted',
        severity: 'CRITICAL',
        reason: 'Amoxicillin predicted to run out in 2.4 days due to +23% patient surge.',
      },
    })
  }

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
