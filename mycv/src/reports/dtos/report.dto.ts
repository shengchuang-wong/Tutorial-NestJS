import { Expose, Transform } from "class-transformer";
import { User } from "src/users/users.entity";

export class ReportDto {
  @Expose()
  id: number;
  @Expose()
  price: number;
  @Expose()
  year: number;
  @Expose()
  lat: number;
  @Expose()
  lng: number;
  @Expose()
  make: string;
  @Expose()
  model: string;
  @Expose()
  mileage: string;
  @Expose()
  approved: string;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}