// Se ubica en infraestructura porque tiene intereacción con la base de datos
import { Module, Provider } from '@nestjs/common';
import { FilesServiceImp } from '../application/services/files.service';
import { FilesRepositoryImpl } from './repositories/files.repository';

const providers: Provider[] = [
  {
    provide: 'FilesService',
    useClass: FilesServiceImp,
  },
  {
    provide: 'FilesRepository',
    useClass: FilesRepositoryImpl,
  },
];

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: 'FilesService',
      useClass: FilesServiceImp,
    },
    {
      provide: 'FilesRepository',
      useClass: FilesRepositoryImpl,
    },
  ],
  exports: providers,
})
export class FilesModule {}
