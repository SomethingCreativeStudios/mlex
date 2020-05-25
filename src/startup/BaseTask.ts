import { INestApplication } from '@nestjs/common';

/**
 * A base task used for start up
 */
export abstract class BaseTask {
  constructor(public app: INestApplication) {}

  /**
   * Run the task
   */
  public abstract async executeTask(): Promise<void>;
}
