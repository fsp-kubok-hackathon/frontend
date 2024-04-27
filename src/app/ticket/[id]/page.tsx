import { Metadata, NextPage } from 'next';

import { Ticket } from './Ticket';

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  return {
    title: 'Тикет ' + id,
  };
}

const TicketPage: NextPage<Props> = ({ params: { id } }: Props) => {
  return <Ticket params={{ id }} />;
};

export default TicketPage;
