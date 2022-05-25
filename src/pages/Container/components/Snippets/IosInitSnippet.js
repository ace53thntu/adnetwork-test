import React from 'react';

import {Link} from 'react-router-dom';
import {CopyBlock, atomOneLight} from 'react-code-blocks';
import {SDK_IOS_NAME, SDK_IOS_CONFIG} from 'constants/container';


function IosInitSnippet({containerId, isTv = false}) {
  return (
    <div className="aicactus-snippet-container">
      <h3 className="font-weight-bold">Example</h3>
      <hr />
      <div>
        To run the example project, clone the repo, and run{' '}
        <code>pod install</code> from the Example directory first. Go to
        Info.plist and replace your container ID or can pass as an argument to
        setup method
      </div>
      <h3 className="font-weight-bold mt-3">Installation</h3>
      <hr />
      <div className="mb-2">
        ${SDK_IOS_NAME} is available through{' '}
        <Link to="https://cocoapods.org/">CocoaPods</Link>. To install it,
        simply add the following line to your Podfile:
      </div>
      <CopyBlock
        theme={atomOneLight}
        text={`pod '${SDK_IOS_NAME}'`}
        language="swift"
        showLineNumbers={false}
        wrapLines
        codeBlock
      />
      <h3 className="font-weight-bold mt-3">Usage</h3>
      <hr />
      <h6 className="font-weight-bold mt-3">Init</h6>
      <strong>From Info.plist</strong>
      <div className="mb-2">
        Add this code to Info.plist and replace your container ID
      </div>
      <CopyBlock
        theme={atomOneLight}
        text={`<key>${SDK_IOS_CONFIG}</key>
<dict>
    <key>containerID</key>
    <string>${containerId}</string>
</dict>`}
        language="swift"
        showLineNumbers={false}
        wrapLines
        codeBlock
      />
      <div className="mt-2 mb-2">Then in code</div>
      <CopyBlock
        theme={atomOneLight}
        text={`import ${SDK_IOS_NAME}

${SDK_IOS_NAME}.shared.setup()
        `}
        language="swift"
        showLineNumbers={false}
        wrapLines
        codeBlock
      />
      <div className="font-weight-bold mt-2 mb-2">
        Or setup from code directly
      </div>
      <CopyBlock
        theme={atomOneLight}
        text={`import ${SDK_IOS_NAME}

${SDK_IOS_NAME}.shared.setup("${containerId}")
        `}
        language="swift"
        showLineNumbers={false}
        wrapLines
        codeBlock
      />
    </div>
  );
}

export default IosInitSnippet;
