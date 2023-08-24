export class Utilities {
  static customToastSuccessMessage = (detail: string, summary?: string) => {
    return {
      severity: 'success',
      summary: summary ?? 'Success',
      detail,
    };
  };

  static customToastErrorMessage = (detail: string, summary?: string) => {
    return {
      severity: 'error',
      summary: summary ?? 'Error',
      detail,
    };
  };
}
