import { Body, Controller, Delete, Get, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { sucessfulResponse } from 'src/utils/response.handler';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { addApartmentDto, ApartmentIdentifier, UpdateApartmentDto } from './dto';
import { FileInterceptor, MemoryStorageFile, UploadedFile } from '@blazity/nest-file-fastify';

@Controller('apartments')
@ApiTags('Apartments')
export class ApartmentController {
	constructor(private readonly apartmentService: ApartmentService) {}

	@ApiConsumes('multipart/form-data')
	@UseInterceptors(FileInterceptor('apartment_pic'))
	@Post('add-apartment')
	async addApartment(@Body() dto: addApartmentDto, @UploadedFile() file: MemoryStorageFile) {
		const data = await this.apartmentService.addApartment(dto, file);
		return sucessfulResponse(data);
	}

	@ApiConsumes('multipart/form-data')
	@UseInterceptors(FileInterceptor('apartment_pic'))
	@Patch('update-apartment')
	async UpdateApartment(@Body() dto: UpdateApartmentDto, @UploadedFile() file?: MemoryStorageFile) {
		const data = await this.apartmentService.updateApartment(dto, file);
		return sucessfulResponse(data);
	}

	@Delete('delete-apartment')
	async DeleteApartment(@Query() dto: ApartmentIdentifier) {
		const data = await this.apartmentService.deleteApartment(dto);
		return sucessfulResponse(data);
	}

	@Get('get-all-apartments')
	async getAllApartments() {
		const data = await this.apartmentService.getAllApartments();
		return sucessfulResponse(data);
	}

	@Get('get-apartment')
	async getApartment(@Query() dto: ApartmentIdentifier) {
		const data = await this.apartmentService.getApartment(dto);
		return sucessfulResponse(data);
	}
}
