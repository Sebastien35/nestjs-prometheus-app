import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MetricsService } from './services/metrics.service';

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  constructor(private readonly metricsService: MetricsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const response = httpContext.getResponse();

    const { method, originalUrl } = request;

    // Start the timer for request duration
    const start = Date.now();

    return next.handle().pipe(
      tap(() => {
        const duration = (Date.now() - start) / 1000; // Duration in seconds
        const statusCode = response.statusCode;

        // Increment the request counter
        this.metricsService.httpRequestCounter
          .labels(method, originalUrl, statusCode.toString())
          .inc();

        // Observe the request duration
        this.metricsService.httpRequestDuration
          .labels(method, originalUrl, statusCode.toString())
          .observe(duration);
      }),
    );
  }
}