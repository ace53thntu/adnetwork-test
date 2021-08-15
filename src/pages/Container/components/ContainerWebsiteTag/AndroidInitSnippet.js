import React from 'react';
import ReactPrismjs from '@uiw/react-prismjs';

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
        source={`implementation 'io.aicactus.sdk:aicactusSDK:1.0.0'`}
        className=""
      />
      In your MainApplication or MainActivity, onCreate method , set up the SDK
      like so:
      <ReactPrismjs
        language="javascript"
        source={`override fun onCreate() {
          super.onCreate()

          // Create an client with the given context and  write key.
          val config = AicactusSDK.Builder(this, '${containerId}@android')
              // Enable this to record certain application events automatically!
              .trackApplicationLifecycleEvents()
              // Enable this to record screen views automatically!
              .recordScreenViews()
              .build()

          // Set the initialized instance as a globally accessible instance.
          AicactusSDK.setup(config)
  }`}
        className=""
      />
      And of course, import the SDK in the files that you use it by adding the
      following line:
      <ReactPrismjs
        language="javascript"
        source={`import io.aicactus.sdk.AicactusSDK`}
        className=""
      />
    </div>
  );
}

export default AndroidInitSnippet;
