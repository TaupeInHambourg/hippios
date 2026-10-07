export interface HorseValues {
  name: string;
  age: string;
  sex: string | null;
  breed: string;
  weight: string;
  height: string;
  coat: string;
  microchipId: string;
  color: string | null;
}

export interface Horse extends HorseValues {
  id: string;
  sensorId: string;
}
