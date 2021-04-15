import { Connection, getRepository } from "typeorm"
import { Bolus } from "./entity/Bolus"

export const Bolus2 = async (Weight, Carbs, CalculationTime) => {
  const BolusRepo = getRepository(Bolus);

  CalculationTime = new Date().toISOString();

  const bolus = BolusRepo.create({weight: Weight, carbs: Carbs, calculationTime: CalculationTime})
  await BolusRepo.save(bolus).catch((err) => {
      console.log(err);
  });
  console.log("saved carbs: ", bolus.carbs, "saved weight: ", bolus.weight, " Time of calculation: ", bolus.calculationTime)
}

export const SelectAllCalculations = async () => {
  const BolusRepo = getRepository(Bolus);

  return await BolusRepo.find().catch((err) => {
    console.log(err);
    throw(err);
  });
}
