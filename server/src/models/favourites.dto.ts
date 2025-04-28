import { IsNotEmpty, IsString } from "class-validator";

export class AddFavouriteDto {
    @IsString()
    @IsNotEmpty()
    title!: string;
    @IsString()
    @IsNotEmpty()
    description!: string;
    @IsString()
    @IsNotEmpty()
    link!: string;
    @IsString()
    @IsNotEmpty()
    image!: string;
}

export type Post = {
    title: string;
    description: string;
    link: string;
    image: string;
  }