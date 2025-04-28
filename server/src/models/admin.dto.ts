import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateCreditsDto {
    @IsString()
    @IsNotEmpty()
    userId!: string;

    @IsNumber()
    @IsNotEmpty()
    credits!: number;
}