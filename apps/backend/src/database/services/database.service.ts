import { DatabaseClient } from '../clients/database.client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService extends DatabaseClient {}
