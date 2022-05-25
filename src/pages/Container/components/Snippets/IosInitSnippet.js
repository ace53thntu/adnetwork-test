import React from 'react';

import {Link} from 'react-router-dom';
import {CopyBlock, atomOneLight} from 'react-code-blocks';
import {SDK_IOS_NAME, SDK_IOS_CONFIG} from 'constants/container';

// const sourceScript = (containerId, isTv = false) => `// ContainerID ${
//   window.ADN_META_DATA.DOMAIN_NAME_1
// }
// let configuration = ${
//   window.ADN_META_DATA.SDK_IOS_CONFIG
// }(writeKey: "${containerId}@${!isTv ? 'ios' : 'appletv'}")
// // Enable this to record certain application events automatically!
// configuration.trackApplicationLifecycleEvents = true
// // Enable this to record screen views automatically!
// configuration.recordScreenViews = true
// ${SDK_IOS_NAME}.setup(with: configuration)`;

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
        language="text"
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
    <string>YOUR CONTAINER ID</string>
</dict>`}
        language="text"
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
        language="text"
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

${SDK_IOS_NAME}.shared.setup(<<<YOUR CONTAINER ID>>>)
        `}
        language="text"
        showLineNumbers={false}
        wrapLines
        codeBlock
      />
      <h6 className="font-weight-bold mt-3 mb-2">Banner Ad</h6>
      <CopyBlock
        theme={atomOneLight}
        text={`// Create AdView with size and type is banner
let adView = AdView()
adView.adSize = .rectangle
adView.adType = .banner
adView.unitID = NSNumber(value: <<<Find your inventory ID in container>>>)
// Add AdView to your layout
self.view.addSubview(adView)
// Perform loadAd with a request
adView.loadAd(AdRequest())`}
        language="text"
        showLineNumbers={false}
        wrapLines
        codeBlock
      />
      <h6 className="font-weight-bold mt-3 mb-2">Video Ad</h6>
      <strong className="font-weight-bold mt-2 mb-2">
        Load Ad VAST Tag Url
      </strong>
      <CopyBlock
        theme={atomOneLight}
        text={`// Create AdView with size and type is video
let videoAdLoader = VideoAdLoader(adUnitID: <<<Find your inventory ID in container>>>, adSize: .video)
// Set delegate to retrieve data later
videoAdLoader.delegate = self
// Perform loadAd with a request
videoAdLoader.loadAd(AdRequest())`}
        language="text"
        showLineNumbers={false}
        wrapLines
        codeBlock
      />
      <strong className="font-weight-bold mt-3 mb-2">
        Using Native Player to player Content and Ad
      </strong>
      <div className="mt-2 mb-2">
        Define your player in layout and connect IBOutlet in your ViewController
      </div>
      <CopyBlock
        theme={atomOneLight}
        text={`@IBOutlet weak var imaPlayer: IMAPlayerView!`}
        language="text"
        showLineNumbers={false}
        wrapLines
        codeBlock
      />
      <div className="mt-2 mb-2">Init player</div>
      <CopyBlock
        theme={atomOneLight}
        text={`override func viewDidLoad() {
super.viewDidLoad()
imaPlayer.setup(contentUrl: ContentURLString)
imaPlayer.delegate = self
}`}
        language="text"
        showLineNumbers={false}
        wrapLines
        codeBlock
      />
      <div className="mt-2 mb-2">Request Ads</div>
      <CopyBlock
        theme={atomOneLight}
        text={`override func viewDidAppear(_ animated: Bool) {
super.viewDidAppear(animated)
imaPlayer.requestAds(adUnitID: <<<Find your inventory ID in container>>>)
}`}
        language="text"
        showLineNumbers={false}
        wrapLines
        codeBlock
      />
      <div className="mt-2 mb-2">
        Listen event video Ad loaded and perform playing
      </div>
      <CopyBlock
        theme={atomOneLight}
        text={`extension ViewController: IMAPlayerViewDelegate {
    func imaPlayerView(_ adsManager: ACIMAAdsManager, didReceive event: ACIMAAdEvent) {
        if event.type == ACIMAAdEventType.LOADED {
            adsManager.start()
        }
    }
    func imaPlayerView(_ adsManager: ACIMAAdsManager, didReceive error: ACIMAAdError) {
        imaPlayer.contentPlayer.play()
    }
    func imaPlayerViewDidRequestContentPause(_ adsManager: ACIMAAdsManager) {
        imaPlayer.contentPlayer.pause()
    }
    func imaPlayerViewDidRequestContentResume(_ adsManager: ACIMAAdsManager) {
        imaPlayer.contentPlayer.play()
    }
    func imaPlayerView(_ loader: ACIMAAdsLoader, adsLoadedWith adsLoadedData: ACIMAAdsLoadedData) {
    }
    func imaPlayerView(_ loader: ACIMAAdsLoader, failedWith adErrorData: ACIMAAdLoadingErrorData) {
        imaPlayer.contentPlayer.play()
    }
}`}
        language="text"
        showLineNumbers={false}
        wrapLines
        codeBlock
      />
      <h6 className="font-weight-bold mt-3 mb-2">Listen Ad Events</h6>
      <strong className="font-weight-bold mt-2 mb-2">
        For Banner Ad - AdViewDelegate
      </strong>
      <CopyBlock
        theme={atomOneLight}
        text={`extension ShowAdViewController: AdViewDelegate {
    func adView(_ adView: AdView, didFailLoad error: AdsNetworkSDKError) {
        print("Ad did fail to load with error: \\(error.errorDescription ?? "Unknown")")
    }
    func adView(_ adView: AdView, didSuccessLoad bid: Bid) {
        print("Ad Loaded with bid id: \\(bid.id)")
    }
    // Override click on Ad behavior
    func adView(_ adView: AdView, didClickAd url: URL) {
        let safariViewController = SFSafariViewController(url: url)
        present(safariViewController, animated: true)
    }
}`}
        language="text"
        showLineNumbers={false}
        wrapLines
        codeBlock
      />
      <strong className="font-weight-bold mt-2 mb-2">
        For Video Ad - VideoAdLoaderDelegate
      </strong>
      <CopyBlock
        theme={atomOneLight}
        text={`extension ShowAdViewController: VideoAdLoaderDelegate {
    func videoAdLoader(_ unitID: Int64, didSuccessLoad bid: Bid, vastTagURL url: String) {
        print("Video Ad Content URL: \\(url)")
    }
    func videoAdLoader(_ unitID: Int64, didFailLoad error: AdsNetworkSDKError) {
        print("Video Ad did fail to load with error: \\(error.errorDescription ?? "Unknown")")
    }
}`}
        language="text"
        showLineNumbers={false}
        wrapLines
        codeBlock
      />
      {/* {SDK_IOS_NAME} is available through <strong>CocoaPods</strong>.
      <div>
        <strong>CocoaPods</strong>
      </div>
      <ReactPrismjs
        language="javascript"
        source={`pod '${SDK_IOS_NAME}'`}
        className=""
      />
      In your application delegate’s application:didFinishLaunchingWithOptions:
      method, set up the SDK like so:
      <ReactPrismjs
        language="javascript"
        source={sourceScript(containerId, isTv)}
        className=""
      />
      And of course, import the SDK in the files that you use it by adding the
      following line:
      <ReactPrismjs
        language="javascript"
        source={`import ${SDK_IOS_NAME}`}
        className=""
      /> */}
    </div>
  );
}

export default IosInitSnippet;
