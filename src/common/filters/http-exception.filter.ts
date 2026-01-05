import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Erro interno do servidor';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object') {
        const responseObj = exceptionResponse as Record<string, unknown>;
        const responseMessage = responseObj.message;
        if (Array.isArray(responseMessage)) {
          message = responseMessage.join(', ');
        } else if (typeof responseMessage === 'string') {
          message = responseMessage;
        } else if (typeof responseObj.error === 'string') {
          message = responseObj.error;
        }
      }
    }

    // Mensagens amigáveis por status
    const friendlyMessages: Record<number, string> = {
      400: 'Dados inválidos. Verifique os campos enviados',
      401: 'Não autorizado. Faça login para continuar',
      403: 'Acesso negado. Você não tem permissão para esta ação',
      404: 'Recurso não encontrado',
      409: 'Conflito. O recurso já existe',
      500: 'Erro interno do servidor. Tente novamente mais tarde',
    };

    response.status(status).json({
      success: false,
      statusCode: status,
      message: Array.isArray(message) ? message : [message],
      error: friendlyMessages[status] || 'Ocorreu um erro',
      timestamp: new Date().toISOString(),
    });
  }
}
