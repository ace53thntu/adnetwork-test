import React from 'react';

import {CopyBlock, atomOneLight} from 'react-code-blocks';

function IosBannerAdsSnippet({inventoryId, isTv = false}) {
  return (
    <div className="aicactus-snippet-container">
      <h6 className="font-weight-bold mt-3 mb-2">Banner Ad</h6>
      <CopyBlock
        theme={atomOneLight}
        text={`// Create AdView with size and type is banner
let adView = AdView()
adView.adSize = .rectangle
adView.adType = .banner
adView.unitID = NSNumber(value: ${inventoryId})
// Add AdView to your layout
self.view.addSubview(adView)
// Perform loadAd with a request
adView.loadAd(AdRequest())`}
        language="text"
        showLineNumbers={false}
        wrapLines
        codeBlock
      />
    </div>
  );
}

export default React.memo(IosBannerAdsSnippet);
