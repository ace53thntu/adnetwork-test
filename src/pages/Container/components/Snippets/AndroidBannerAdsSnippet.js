import React from 'react';

import {CopyBlock, atomOneLight} from 'react-code-blocks';

function AndroidBannerAdsSnippet({inventoryId, isTv = false}) {
  return (
    <div className="aicactus-snippet-container">
      <h6 className="font-weight-bold mt-3 mb-2">Banner Ad</h6>
      <CopyBlock
        theme={atomOneLight}
        text={`/// Create AdView with size and type is banner
  val adView = AdView(requireContext())
  adView.apply {
      id = View.generateViewId()
      size = AdSize.MEDIUM_RECTANGLE
      unitId = ${inventoryId}
  }
  // Add AdView to your layout
  val parent = binding.root as ConstraintLayout
  parent.addView(adView)
  // Perform loadAd with a request
  val adRequest = AdRequest.Builder().build()
  adView.loadAd(adRequest)`}
        language="text"
        showLineNumbers={false}
        wrapLines
        codeBlock
      />
    </div>
  );
}

export default React.memo(AndroidBannerAdsSnippet);
