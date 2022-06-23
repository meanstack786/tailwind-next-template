import Layout from 'components/nav/layout'
import { NextPageWithLayout } from 'types/page'

const Settings: NextPageWithLayout = () => {
  return (
    <div style={{ height: 3000 }}>
      <label>
        <span className="sr-only">Items Per Page</span>
      </label>
    </div>
  )
}

Settings.getLayout = (page) => <Layout>{page}</Layout>

export default Settings
