// dtos/auth.dto.ts
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class SignupDto {
  @IsString()
  @Length(3, 20)
  @IsNotEmpty()
  username!: string;

  @IsString()
  @Length(6, 100)
  @IsNotEmpty()
  password!: string;
}

export class SigninDto {
  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
