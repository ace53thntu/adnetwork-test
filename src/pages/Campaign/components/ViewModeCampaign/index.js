import { Radio } from 'antd';
import "./index.scss";

const options = [
  {
    label: 'View by campaign',
    value: 'campaign',
  },
  {
    label: 'View by strategy',
    value: 'strategy',
  },
];

const ViewModeCampaign = ({ value, onChange}) => {

  return <Radio.Group
    options={options}
    onChange={(e) => onChange(e.target.value)}
    value={value}
    optionType="button"
    buttonStyle="solid"
  />
}

export default ViewModeCampaign;
