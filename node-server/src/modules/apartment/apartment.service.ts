import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { addApartmentDto, ApartmentIdentifier, UpdateApartmentDto } from './dto';
import { CustomBadRequestException, CustomNotFoundException } from 'src/utils/custom.exceptions';
import { handleException } from 'src/utils/error.handler';
import { MemoryStorageFile } from '@blazity/nest-file-fastify';
import { addPathToFiles, deleteFilesByGlob, saveFilesOnServer } from 'src/utils/file.handler';

@Injectable()
export class ApartmentService {
	constructor(private readonly prisma: PrismaService) {}

	async addApartment(dto: addApartmentDto, file: MemoryStorageFile) {
		try {
			if (!file) throw new CustomBadRequestException('File must be added');
			const ExistingApartment = await this.prisma.apartment.findFirst({
				where: {
					name: dto.name,
				},
			});

			if (ExistingApartment) {
				throw new CustomBadRequestException('There is an apartment with this name');
			}

			const nestedFolder = `apartments/apartment-${dto.name.replaceAll(' ', '')}`;
			const filesWithPathAndURl = await addPathToFiles([file], 'Nawy', nestedFolder);

			const apartment = await this.prisma.apartment.create({
				data: {
					address: dto.address,
					description: dto.description,
					name: dto.name,
					price: +dto.price,
					pic_url: filesWithPathAndURl[0].fileurl,
				},
			});

			if (file)
				try {
					await saveFilesOnServer(filesWithPathAndURl);
				} catch (error) {
					await this.prisma.apartment.delete({
						where: { id: apartment.id },
					});

					throw new InternalServerErrorException(
						'Error saving files while creating apartment',
						(error as Error).message,
					);
				}

			return apartment;
		} catch (error) {
			handleException(error);
		}
	}

	async updateApartment(dto: UpdateApartmentDto, file: MemoryStorageFile) {
		try {
			const apartment = await this.prisma.apartment.findFirst({
				where: {
					id: +dto.apartment_id,
				},
			});

			if (!apartment) {
				throw new CustomNotFoundException('Apartment not found');
			}

			let filesWithPathAndURl;
			const nestedFolder = `apartments/apartment-${dto.name.replaceAll(' ', '')}`;
			if (file) {
				filesWithPathAndURl = await addPathToFiles([file], 'Nawy', nestedFolder);
			}

			const data = {
				address: dto.address,
				description: dto.description,
				name: dto.name,
				price: +dto.price,
				pic_url: '',
			};

			if (!file) delete data.pic_url;
			else data.pic_url = filesWithPathAndURl[0].fileurl;

			const updatedApartment = await this.prisma.apartment.update({
				where: {
					id: +dto.apartment_id,
				},
				data: data,
			});

			if (file)
				try {
					const globDeletionPatterns = [];
					if (filesWithPathAndURl && filesWithPathAndURl.length !== 0) {
						globDeletionPatterns.push(...filesWithPathAndURl.map((file) => file.fieldname));
					}

					await deleteFilesByGlob({
						fileFieldNames: globDeletionPatterns,
						nestedFolder: nestedFolder,
						clientQrcode: 'Nawy',
					});
					await saveFilesOnServer(filesWithPathAndURl);
				} catch (error) {
					await this.prisma.apartment.delete({
						where: { id: updatedApartment.id },
					});

					throw new InternalServerErrorException(
						'Error saving files while creating site',
						(error as Error).message,
					);
				}
			return updatedApartment;
		} catch (error) {
			handleException(error);
		}
	}

	async deleteApartment(dto: ApartmentIdentifier) {
		try {
			const apartment = await this.prisma.apartment.findFirst({
				where: {
					id: +dto.apartment_id,
				},
			});

			if (!apartment) {
				throw new CustomNotFoundException('Apartment not found!');
			}

			const deletedApartment = await this.prisma.apartment.delete({
				where: {
					id: +dto.apartment_id,
				},
			});

			return deletedApartment;
		} catch (error) {
			handleException(error);
		}
	}

	async getAllApartments() {
		try {
			const Apartments = await this.prisma.apartment.findMany();
			return Apartments;
		} catch (error) {
			handleException(error);
		}
	}

	async getApartment(dto: ApartmentIdentifier) {
		try {
			const apartment = await this.prisma.apartment.findFirst({
				where: {
					id: +dto.apartment_id,
				},
			});

			if (!apartment) {
				throw new CustomNotFoundException('Apartment not found!');
			}

			return apartment;
		} catch (error) {
			handleException(error);
		}
	}
}
