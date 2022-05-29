import React from 'react';

import {CopyBlock, atomOneLight} from 'react-code-blocks';

function IosVideoAdsSnippet({inventoryId}) {
  return (
    <div className="aicactus-snippet-container">
      <h6 className="font-weight-bold mt-3 mb-2">Video Ad</h6>
      <strong className="font-weight-bold mt-2 mb-2">
        Load Ad VAST Tag Url
      </strong>
      <CopyBlock
        theme={atomOneLight}
        text={`// Create AdView with size and type is video
let videoAdLoader = VideoAdLoader(adUnitID: ${inventoryId}, adSize: .video)
// Set delegate to retrieve data later
videoAdLoader.delegate = self
// Perform loadAd with a request
videoAdLoader.loadAd(AdRequest())`}
        language="swift"
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
        language="swift"
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
        language="swift"
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
        language="swift"
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
        language="swift"
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
        language="swift"
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
        language="swift"
        showLineNumbers={false}
        wrapLines
        codeBlock
      />
    </div>
  );
}

export default React.memo(IosVideoAdsSnippet);
