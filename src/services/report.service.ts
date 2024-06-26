import { api } from '@/api/axios.config';

export class ReportService {
  /** @ts-ignore */
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

  /** @ts-ignore */
  static async getItems({ ticketId }) {
    const response = await api.get(`/reports/items/${ticketId}?approved=false`);

    // HACK
    if (response.status === 404) {
      return [];
    }

    return response.data;
  }
}
