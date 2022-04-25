import {SDK_NAME} from 'constants/container';
import React from 'react';

import ReactPrismjs from '@uiw/react-prismjs';

const sourceScript = containerId => `// ContainerID ${window.ADN_META_DATA.DOMAIN_NAME_1}
let configuration = ${window.ADN_META_DATA.SDK_IOS_CONFIG}(writeKey: "${containerId}@ios")
// Enable this to record certain application events automatically!
configuration.trackApplicationLifecycleEvents = true
// Enable this to record screen views automatically!
configuration.recordScreenViews = true
${SDK_NAME}.setup(with: configuration)`;

function IosInitSnippet({containerId}) {
  return (
    <div className="aicactus-snippet-container">
      {SDK_NAME} is available through <strong>CocoaPods</strong>.
      <div>
        <strong>CocoaPods</strong>
      </div>
      <ReactPrismjs
        language="javascript"
        source={`pod '${SDK_NAME}'`}
        className=""
      />
      In your application delegate’s application:didFinishLaunchingWithOptions:
      method, set up the SDK like so:
      <ReactPrismjs
        language="javascript"
        source={sourceScript(containerId)}
        className=""
      />
      And of course, import the SDK in the files that you use it by adding the
      following line:
      <ReactPrismjs
        language="javascript"
        source={`import ${SDK_NAME}`}
        className=""
      />
    </div>
  );
}

export default IosInitSnippet;
