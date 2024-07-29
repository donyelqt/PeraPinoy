import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'
const sql = neon('postgresql://budget-planner_owner:m7sgJ3BUxNIF@ep-billowing-unit-a53qsyts.us-east-2.aws.neon.tech/Expenses-Tracker?sslmode=require');
export const db = drizzle(sql,{schema});