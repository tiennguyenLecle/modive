import LocalizedLink from '@/components/LocalizedLink';
import { Button, Result } from 'antd';

const NotFoundPage = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <LocalizedLink href="/">
        <Button type="primary">Back Home</Button>
      </LocalizedLink>
    }
  />
);

export default NotFoundPage;
