import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MetricsInterceptor } from './metrics.interceptor';
import { MetricsService } from './services/metrics.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get the MetricsService instance
  const metricsService = app.get(MetricsService);

  // Apply the interceptor globally
  app.useGlobalInterceptors(new MetricsInterceptor(metricsService));

  await app.listen(3000);
}
bootstrap();