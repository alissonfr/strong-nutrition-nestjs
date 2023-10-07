import { Catch, ExceptionFilter, HttpException, ArgumentsHost, HttpStatus } from '@nestjs/common';

@Catch()
export class ExceptionHandler implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      // Verifique se a exceção é uma exceção de validação e retorne a resposta adequada
      if (status === HttpStatus.BAD_REQUEST) {
        return response.status(status).json({
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
          message: 'Erro de validação',
          errors: exception.getResponse(),
        });
      }
      // Se não for uma exceção de validação, trate-a de acordo com a lógica desejada
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: exception.message,
      });
    } else {
      // Trate outras exceções aqui, se necessário
    }
  }
}
