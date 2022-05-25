import React from 'react';

import {CopyBlock, atomOneLight} from 'react-code-blocks';

function AndroidVideoAdsSnippet({inventoryId}) {
  console.log(
    '🚀 ~ file: AndroidVideoAdsSnippet.js ~ line 6 ~ AndroidVideoAdsSnippet ~ inventoryId',
    inventoryId
  );
  return (
    <div className="aicactus-snippet-container">
      <h6 className="font-weight-bold mt-3 mb-2">Video Ad</h6>
      <strong className="font-weight-bold mt-2 mb-2">
        Load Ad VAST Tag Url
      </strong>
      <CopyBlock
        theme={atomOneLight}
        text={`// Create VideoAdLoader with size and type is video
val videoAdLoader = VideoAdLoader.Builder(
requireContext(),
adUnitID = ${inventoryId},
adSize = AdSize.VIDEO
).build()
// Set listener to retrieve data later
videoAdLoader.listener = this
// Perform loadAd with a request
val adRequest = AdRequest.Builder().build()
videoAdLoader.loadAd(adRequest)`}
        language="kotlin"
        showLineNumbers={false}
        wrapLines
        codeBlock
      />
      <strong className="font-weight-bold mt-3 mb-2">
        Using Native Player to player Content and Ad
      </strong>
      <strong>Using ExoPlayer</strong>
      <div className="mt-2 mb-2">
        If you're using ExoPlayer in current project, you should be declare
        exact version in project's build.gradle to prevent duplicate
      </div>
      <CopyBlock
        theme={atomOneLight}
        text={`ext {
    exoPlayerVersion = "2.X.X"
}`}
        language="kotlin"
        showLineNumbers={false}
        wrapLines
        codeBlock
      />
      <div className="mt-2 mb-2">Define your player in layout</div>
      <CopyBlock
        theme={atomOneLight}
        text={`<com.google.android.exoplayer2.ui.PlayerView
android:id="@+id/player_view"
android:layout_width="match_parent"
android:layout_height="wrap_content"
app:layout_constraintTop_toTopOf="parent"
app:layout_constraintBottom_toBottomOf="parent"/>`}
        language="kotlin"
        showLineNumbers={false}
        wrapLines
        codeBlock
      />
      <div className="mt-2 mb-2">Declare Player and AdsLoader</div>
      <CopyBlock
        theme={atomOneLight}
        text={`private lateinit var imaAdsLoader: ImaAdsLoader
private var player: Player? = null`}
        language="kotlin"
        showLineNumbers={false}
        wrapLines
        codeBlock
      />
      <div className="mt-2 mb-2">Init player</div>
      <CopyBlock
        theme={atomOneLight}
        text={`private fun initializePlayer(vastTagUrl: String) {
    val dataSourceFactory = DefaultDataSource.Factory(requireContext())
    val mediaSourceFactory = DefaultMediaSourceFactory(dataSourceFactory).apply {
        setAdsLoaderProvider { imaAdsLoader }
        setAdViewProvider { binding.playerView }
    }
    player = ExoPlayer.Builder(requireContext()).apply {
        setMediaSourceFactory(mediaSourceFactory)
    }.build()
    binding.playerView.player = player
    imaAdsLoader.setPlayer(player)
    val contentUri = Uri.parse("<<<YOUR CONTENT URL>>>")
    val adTagUri = Uri.parse(vastTagUrl)
    val adsConfiguration = MediaItem.AdsConfiguration.Builder(adTagUri).build()
    val mediaItem = MediaItem.Builder().apply {
        setUri(contentUri)
        setAdsConfiguration(adsConfiguration)
    }.build()
    player?.apply {
        setMediaItem(mediaItem)
        prepare()
        playWhenReady = false
    }
}`}
        language="kotlin"
        showLineNumbers={false}
        wrapLines
        codeBlock
      />
      <div className="mt-3 mb-2">
        Listen event video Ad loaded and perform playing
      </div>
      <CopyBlock
        theme={atomOneLight}
        text={`videoAdLoader.listener = object : VideoAdListener {
    override fun onVideoAdLoaded(adUnitID: Int, bid: Bid, vastTagUrl: String) {
        // Call init with vast tag url
        initializePlayer(vastTagUrl)
        // Play Video Ad
        binding.playerView.onResume()
        }
        override fun onVideoAdFailedToLoad(adUnitID: Int, error: String) {
        Log.d("VideoAdFragment","Video Ad did fail to load with error:: $error")
    }
}`}
        language="kotlin"
        showLineNumbers={false}
        wrapLines
        codeBlock
      />
      <strong className="font-weight-bold mt-2 mb-2">
        Using Aicactus Player
      </strong>
      <div>
        If you're using ExoPlayer in current project, you should be declare
        exact version in project's build.gradle to prevent duplicate
      </div>
      <CopyBlock
        theme={atomOneLight}
        text={`ext {
    exoPlayerVersion = "2.X.X"
}`}
        language="kotlin"
        showLineNumbers={false}
        wrapLines
        codeBlock
      />
      <div className="mt-2 mb-2">Define your player in layout</div>
      <CopyBlock
        theme={atomOneLight}
        text={`<io.aicactus.adsnetwork.ads.ima.PlayerView
android:id="@+id/player_view"
android:layout_width="match_parent"
android:layout_height="wrap_content"
app:layout_constraintTop_toTopOf="parent"
app:layout_constraintBottom_toBottomOf="parent"/>`}
        language="kotlin"
        showLineNumbers={false}
        wrapLines
        codeBlock
      />
      <div className="mt-2 mb-2">
        Declare PlayerView and set content uri which need to play with ads
      </div>
      <CopyBlock
        theme={atomOneLight}
        text={`val playerView = findViewById<PlayerView>(R.id.player_view)
playerView.apply {
contentUri = "https://storage.googleapis.com/gvabox/media/samples/stock.mp4"
autoPlay = false
}`}
        language="kotlin"
        showLineNumbers={false}
        wrapLines
        codeBlock
      />
      <div className="mt-2 mb-2">Perform request Ad</div>
      <CopyBlock
        theme={atomOneLight}
        text={`playerView.requestAd(${inventoryId})`}
        language="kotlin"
        showLineNumbers={false}
        wrapLines
        codeBlock
      />
      <div className="mt-2 mb-2">Setup listener for events</div>
      <CopyBlock
        theme={atomOneLight}
        text={`playerView.listener = object : ImaAdsLoadListener {
    override fun onImaAdsLoaded(adUnitID: Int, bid: Bid, vastTagUrl: String) {
        Log.d("onImaAdsLoaded","Video Ad Content URL: $vastTagUrl")
    }
    override fun onImaAdsFailedToLoad(adUnitID: Int, error: String) {
        Log.d("onImaAdsFailedToLoad","Video Ad did fail to load with error: $error")
    }
    override fun onAdErrorEvent(adErrorEvent: AdErrorEvent?) {
        super.onAdErrorEvent(adErrorEvent)
        Log.d("onAdErrorEvent","Ad Error Event: \${adErrorEvent?.error?.localizedMessage}")
    }
    override fun onAdEvent(adEvent: AdEvent?) {
        super.onAdEvent(adEvent)
        Log.d("onAdEvent","Ad Event: \${adEvent?.type?.name}")
    }
}`}
        language="kotlin"
        showLineNumbers={false}
        wrapLines
        codeBlock
      />
      <div className="mt-2 mb-2">
        Don't forget release to prevent leak memory when screen is destroyed
      </div>
      <CopyBlock
        theme={atomOneLight}
        text={`playerView.releasePlayer()`}
        language="kotlin"
        showLineNumbers={false}
        wrapLines
        codeBlock
      />
      <h6 className="font-weight-bold mt-3 mb-2">Listen Ad Events</h6>
      <strong>For Banner Ad - AdListener</strong>
      <CopyBlock
        theme={atomOneLight}
        text={`adView.adListener = object: AdListener {
    override fun onAdLoaded(adUnitID: Int, bid: Bid) {
        Log.d("AdView", "Ad Loaded with bid id: \${bid.id}")
    }
    override fun onAdFailedToLoad(adUnitID: Int, error: String) {
        Log.d("AdView", "Ad did fail to load with error:: $error")
    }
    override fun shouldOverrideOnAdClicked(view: BaseAdView, uri: Uri?): Boolean {
        Log.d("AdView", "Click on Ad")
        return super.shouldOverrideOnAdClicked(view, uri)
    }
}`}
        language="kotlin"
        showLineNumbers={false}
        wrapLines
        codeBlock
      />
      <strong>For Video Ad - VideoAdListener</strong>
      <CopyBlock
        theme={atomOneLight}
        text={`videoAdLoader.listener = object : VideoAdListener {
    override fun onVideoAdLoaded(adUnitID: Int, bid: Bid, vastTagUrl: String) {
        Log.d("VideoAdFragment","Video Ad Content URL: $vastTagUrl")
        binding.textAdContentUrl.text = vastTagUrl
    }
    override fun onVideoAdFailedToLoad(adUnitID: Int, error: String) {
        Log.d("VideoAdFragment","Video Ad did fail to load with error:: $error")
    }
}`}
        language="kotlin"
        showLineNumbers={false}
        wrapLines
        codeBlock
      />
    </div>
  );
}

export default React.memo(AndroidVideoAdsSnippet);
