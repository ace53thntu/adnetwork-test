import React from 'react';

import ReactPrismjs from '@uiw/react-prismjs';
import {DOMAIN_NAME, SDK_NAME, SDK_NAME_1} from 'constants/container';

function AndroidInitSnippet({containerId}) {
  return (
    <div className="aicactus-snippet-container">
      Modify build.gradle at the root project in this way:
      <ReactPrismjs
        language="javascript"
        source={`allprojects {
          repositories {
              mavenCentral()
              maven {
                  url 'https://oss.sonatype.org/content/groups/public'
              }
  }`}
        className=""
      />
      then in the build.gradle (at the module level) you add the new dependency:
      <ReactPrismjs
        language="javascript"
        source={`implementation 'io.${DOMAIN_NAME}.sdk:${SDK_NAME_1}:1.0.0'`}
        className=""
      />
      In your MainApplication or MainActivity, onCreate method , set up the SDK
      like so:
      <ReactPrismjs
        language="javascript"
        source={`override fun onCreate() {
          super.onCreate()

          // Create an client with the given context and  write key.
          val config = ${SDK_NAME}.Builder(this, '${containerId}@android')
              // Enable this to record certain application events automatically!
              .trackApplicationLifecycleEvents()
              // Enable this to record screen views automatically!
              .recordScreenViews()
              .build()

          // Set the initialized instance as a globally accessible instance.
          ${SDK_NAME}.setup(config)
  }`}
        className=""
      />
      And of course, import the SDK in the files that you use it by adding the
      following line:
      <ReactPrismjs
        language="javascript"
        source={`import io.${DOMAIN_NAME}.sdk.${SDK_NAME}`}
        className=""
      />
    </div>
  );
}

export default AndroidInitSnippet;
