import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateApartmentDto {
	@ApiProperty({ example: 1 })
	@IsNumber()
	@Transform(({ value }) => parseInt(value))
	apartment_id: number;

	@ApiProperty({ example: 'Apartment' })
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiProperty({ example: 'Apartment with 2 rooms' })
	@IsString()
	@IsNotEmpty()
	description: string;

	@ApiProperty({ example: 'New cairo' })
	@IsString()
	@IsNotEmpty()
	address: string;

	@ApiProperty({ example: 12000 })
	@IsNumber()
	@Transform(({ value }) => parseInt(value))
	@IsNotEmpty()
	price: number;

	@ApiProperty({ type: 'string', format: 'binary', required: false })
	@IsOptional()
	apartment_pic?: any;
}
