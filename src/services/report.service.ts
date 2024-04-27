import { api } from '@/api/axios.config';

export class ReportService {
  static async upload({ file, ticketId }) {
    console.log(ticketId, 'from report.service');
    const formData = new FormData();

    console.log('reportservice', file);

    formData.append(`file`, file);

    const response = await api.post(`/reports?ticketId=${ticketId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status != 201) {
      throw new Error('Error uploading report');
    }
  }
}
