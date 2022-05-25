import React from 'react';

import {Link} from 'react-router-dom';
import {CopyBlock, atomOneLight} from 'react-code-blocks';
import {SDK_ANDROID_NAME_SPACE, SDK_ANDROID_DEPENDENCY, SDK_ANDROID_NAME} from 'constants/container';

function IosInitSnippet({containerId, isTv = false}) {
  return (
    <div className="aicactus-snippet-container">
      <h3 className="font-weight-bold">Example</h3>
      <hr />
      <div>
        To run the example project, clone the repo, and open it using Android
        Studio.
      </div>
      <div>
        Go to Android Manifest and replace YOUR_CONTAINER_ID or can pass as an
        argument to setup method
      </div>
      <CopyBlock
        theme={atomOneLight}
        text={`<meta-data
    android:name="${SDK_ANDROID_DEPENDENCY}.CONTAINER_ID"
    android:value="${containerId}"
/>`}
        language="kotlin"
        showLineNumbers={false}
        wrapLines
        codeBlock
      />
      <h3 className="font-weight-bold mt-3">Installation</h3>
      <hr />
      <div className="mb-2">
        ${SDK_ANDROID_NAME} is available through{' '}
        <Link to="https://mvnrepository.com/search?q=aicactus">MVN</Link>. To
        install it, add mavenCentral to your repositories if it's not added yet.
      </div>
      <CopyBlock
        theme={atomOneLight}
        text={`repositories {
    mavenCentral()
}`}
        language="kotlin"
        showLineNumbers={false}
        wrapLines
        codeBlock
      />
      <div className='mt-2 mb-2'>Import Aicactus AdsNetwork SDK dependency</div>
      <CopyBlock
        theme={atomOneLight}
        text={`dependencies {
    implementation 'io.aicactus:adsnetwork:1.X.X'
}`}
        language="kotlin"
        showLineNumbers={false}
        wrapLines
        codeBlock
      />
      <h3 className="font-weight-bold mt-3">Usage</h3>
      <hr />
      <h6 className="font-weight-bold mt-3">Init</h6>
      <strong>From AndroidManifest.xml</strong>
      <div className="mb-2">
      Add this code to app manifest, wrapped in <code>{`<application>`}</code> tag and replace YOUR_CONTAINER_ID
      </div>
      <CopyBlock
        theme={atomOneLight}
        text={`<meta-data
    android:name="${SDK_ANDROID_NAME_SPACE}.CONTAINER_ID"
    android:value="${containerId}"
/>`}
        language="kotlin"
        showLineNumbers={false}
        wrapLines
        codeBlock
      />
      <div className="mt-2 mb-2">Then in code</div>
      <CopyBlock
        theme={atomOneLight}
        text={`import ${SDK_ANDROID_NAME_SPACE}.internal.${SDK_ANDROID_NAME}
${SDK_ANDROID_NAME}.setup(context) { _, errorMessage -> }`}
        language="kotlin"
        showLineNumbers={false}
        wrapLines
        codeBlock
      />
      <div className="font-weight-bold mt-2 mb-2">
        Or setup from code directly
      </div>
      <CopyBlock
        theme={atomOneLight}
        text={`import ${SDK_ANDROID_NAME_SPACE}.internal.${SDK_ANDROID_NAME}
${SDK_ANDROID_NAME}.setup(context, "${containerId}") { _, errorMessage -> }
`}
        language="kotlin"
        showLineNumbers={false}
        wrapLines
        codeBlock
      />
    </div>
  );
}

export default IosInitSnippet;
