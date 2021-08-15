export const SAMPLE_FILES = [
  {
    key: 'crm_csv',
    type: 'csv',
    filename: 'crm'
  },
  {
    key: 'crm_json',
    type: 'json',
    filename: 'crm'
  },
  {
    key: 'product_csv',
    type: 'csv',
    filename: 'product'
  },
  {
    key: 'product_json',
    type: 'json',
    filename: 'product'
  },
  {
    key: 'segment_csv',
    type: 'csv',
    filename: 'segment'
  },
  {
    key: 'segment_json',
    type: 'json',
    filename: 'segment'
  },
  {
    key: 'log_csv',
    type: 'csv',
    filename: 'log'
  },
  {
    key: 'log_json',
    type: 'json',
    filename: 'log'
  }
];

export const SAMPLE_DATA = {
  crm_json: [
    {
      id: 'd9e4777d-528c-40cc-b4f7-2095ba1c4c93',
      email: 'chithanh12@gmail.com',
      email_md5: 'chithanh12@gmail.com',
      mobile: '1234765',
      name: 'Thanh',
      abc: 'xyz',
      google_id: 'google_1',
      facebook_id: 'fb_001',
      address: 'address 1',
      gender: 'male'
    },
    {
      id: '7d0bbe81-fb31-4811-9045-50025eb1aa26',
      email: 'quynh18072001@gmail.com',
      email_md5: 'quynh18072001@gmail.com',
      mobile: '0988960658',
      name: 'Quynh Tran JP',
      abc: 'abc',
      google_id: 'google_2',
      facebook_id: 'fb 2',
      address: 'address 2',
      gender: 'female'
    },
    {
      id: '54255ccf-78e5-4dde-8ad1-f5379de0fea0',
      email: 'thanhnguyen@aicactus.io',
      email_md5: 'thanhnguyen@aicactus.io',
      mobile: '0988960658',
      name: 'Thanh',
      abc: 'bbb',
      google_id: 'google 3',
      facebook_id: 'fb 3',
      address: 'address 3',
      gender: 'male'
    }
  ],
  product_json: [
    {
      product_id: '058dc6bd-0e9d-486e-9f82-d955bdff69f5',
      container_id: '749be575-e2ab-4b67-8456-ed7199151349',
      title: 'Cuoc chien thuong luu',
      description:
        'Phim Penthouse Cuộc Chiến Thượng Lưu Phần 1 Hàn Quốc tham gia Ji Ah, So Yeon, Eugene, Ki Joon.',
      type: 'video',
      status: 'active',
      released_at: 1621082610,
      categories: {phim_han_quoc: 1, phim_bo: 2, phim_ngon_tinh: 2},
      iab_categories: {movie: 1, entertainment: 1, love: 2},
      metadata: {name: '1234', sensor: true},
      keywords: {'cuoc chien': 1, 'thuong luu': 1, 'han quoc': 1},
      tags: ['han quoc', 'ngon tinh'],
      countries: ['vn', 'han quoc']
    },
    {
      product_id: '4349372f-ad2d-47d8-bacd-610163569d97',
      container_id: '749be575-e2ab-4b67-8456-ed7199151349',
      title: 'Anh em nha bac si',
      description: 'Hai anh em nha bac si bi ung thu',
      type: 'video',
      status: 'active',
      release_at: 1621082610,
      categories: {phim_han_quoc: 1, phim_bo: 2, phim_ngon_tinh: 2},
      iab_categories: {movie: 1, entertainment: 1, love: 2},
      metadata: {name: '1234', sensor: true},
      keywords: {'cuoc chien': 1, 'thuong luu': 1, 'han quoc': 1},
      tags: ['han quoc', 'ngon tinh'],
      countries: ['vn', 'han quoc']
    }
  ],
  segment_json: [
    {
      user_id: 'ca8fe421-f4fd-44fb-9eaf-f9fe5f383685',
      email: '',
      mobile: 123467876586,
      facebook_id: 'ca8fe421-f4fd-44fb-9eaf-f9fe5f383685',
      google_id: '',
      male: true,
      female: false,
      age_le_15: false,
      age_15_24: true,
      age_25_34: true,
      age_35_44: 1234,
      age_45_54: '',
      age_55_64: '',
      age_gt_64: '',
      sport: true,
      love_music: false
    },
    {
      user_id: 'f51bb8ab-9b71-494f-9d36-7d886d818f88',
      email: 'chithanh12@gmail.com',
      mobile: '0986129479',
      facebook_id: '1b3f0b5e-210b-46a5-b4e5-228a8ba31b19',
      google_id: 'c64ab581-bf27-4cec-b90e-92c801231cef',
      male: true,
      female: false,
      age_le_15: true,
      age_15_24: false,
      age_25_34: false,
      age_35_44: false,
      age_45_54: false,
      age_55_64: false,
      age_gt_64: false,
      sport: '',
      love_music: true
    },
    {
      user_id: '93744ebb-c865-46ea-85cb-9760d09258e1',
      email: 'chithanh_12@yahoo.com',
      mobile: 123405678,
      facebook_id: '',
      google_id: '93744ebb-c865-46ea-85cb-9760d09258e1',
      male: true,
      female: false,
      age_le_15: false,
      age_15_24: false,
      age_25_34: true,
      age_35_44: '',
      age_45_54: '',
      age_55_64: '',
      age_gt_64: '',
      sport: true,
      love_music: false
    }
  ],
  crm_csv: [
    {
      id: 'd9e4777d-528c-40cc-b4f7-2095ba1c4c93',
      email: 'chithanh12@gmail.com',
      email_md5: 'chithanh12@gmail.com',
      mobile: '1234765',
      name: 'Thanh',
      abc: 'xyz',
      google_id: 'google_1',
      facebook_id: 'fb_001',
      address: 'address 1',
      gender: 'male'
    },
    {
      id: '7d0bbe81-fb31-4811-9045-50025eb1aa26',
      email: 'quynh18072001@gmail.com',
      email_md5: 'quynh18072001@gmail.com',
      mobile: '0988960658',
      name: 'Quynh Tran JP',
      abc: 'abc',
      google_id: 'google_2',
      facebook_id: 'fb 2',
      address: 'address 2',
      gender: 'female'
    },
    {
      id: '54255ccf-78e5-4dde-8ad1-f5379de0fea0',
      email: 'thanhnguyen@aicactus.io',
      email_md5: 'thanhnguyen@aicactus.io',
      mobile: '0988960658',
      name: 'Thanh',
      abc: 'bbb',
      google_id: 'google 3',
      facebook_id: 'fb 3',
      address: 'address 3',
      gender: 'male'
    }
  ],
  product_csv: [
    {
      product_id: '058dc6bd-0e9d-486e-9f82-d955bdff69f5',
      container_id: '749be575-e2ab-4b67-8456-ed7199151349',
      title: 'Cuoc chien thuong luu',
      description:
        'Phim Penthouse Cuộc Chiến Thượng Lưu Phần 1 Hàn Quốc tham gia Ji Ah, So Yeon, Eugene, Ki Joon.',
      type: 'video',
      status: 'active',
      released_at: 1621082610,
      categories: {phim_han_quoc: 1, phim_bo: 2, phim_ngon_tinh: 2},
      iab_categories: {movie: 1, entertainment: 1, love: 2},
      metadata: {name: '1234', sensor: true},
      keywords: {'cuoc chien': 1, 'thuong luu': 1, 'han quoc': 1},
      tags: ['han quoc', 'ngon tinh'],
      countries: ['vn', 'han quoc']
    },
    {
      product_id: '4349372f-ad2d-47d8-bacd-610163569d97',
      container_id: '749be575-e2ab-4b67-8456-ed7199151349',
      title: 'Anh em nha bac si',
      description: 'Hai anh em nha bac si bi ung thu',
      type: 'video',
      status: 'active',
      release_at: 1621082610,
      categories: {phim_han_quoc: 1, phim_bo: 2, phim_ngon_tinh: 2},
      iab_categories: {movie: 1, entertainment: 1, love: 2},
      metadata: {name: '1234', sensor: true},
      keywords: {'cuoc chien': 1, 'thuong luu': 1, 'han quoc': 1},
      tags: ['han quoc', 'ngon tinh'],
      countries: ['vn', 'han quoc']
    }
  ],
  segment_csv: [
    {
      user_id: 'ca8fe421-f4fd-44fb-9eaf-f9fe5f383685',
      email: '',
      mobile: 123467876586,
      facebook_id: 'ca8fe421-f4fd-44fb-9eaf-f9fe5f383685',
      google_id: '',
      male: true,
      female: false,
      age_le_15: false,
      age_15_24: true,
      age_25_34: true,
      age_35_44: 1234,
      age_45_54: '',
      age_55_64: '',
      age_gt_64: '',
      sport: true,
      love_music: false
    },
    {
      user_id: 'f51bb8ab-9b71-494f-9d36-7d886d818f88',
      email: 'chithanh12@gmail.com',
      mobile: '0986129479',
      facebook_id: '1b3f0b5e-210b-46a5-b4e5-228a8ba31b19',
      google_id: 'c64ab581-bf27-4cec-b90e-92c801231cef',
      male: true,
      female: false,
      age_le_15: true,
      age_15_24: false,
      age_25_34: false,
      age_35_44: false,
      age_45_54: false,
      age_55_64: false,
      age_gt_64: false,
      sport: '',
      love_music: true
    },
    {
      user_id: '93744ebb-c865-46ea-85cb-9760d09258e1',
      email: 'chithanh_12@yahoo.com',
      mobile: 123405678,
      facebook_id: '',
      google_id: '93744ebb-c865-46ea-85cb-9760d09258e1',
      male: true,
      female: false,
      age_le_15: false,
      age_15_24: false,
      age_25_34: true,
      age_35_44: '',
      age_45_54: '',
      age_55_64: '',
      age_gt_64: '',
      sport: true,
      love_music: false
    }
  ],
  log_json: [
    {
      type: 'track',
      anonymousId: '9457A711-5CEE-4765-A539-2A3C552A477A',
      userId: '763422ad-cdb5-9139-cc2f-0ea50721db67',
      event: 'video progress',
      properties: {
        bitrate: '',
        content_id: '55aa05ee-5ec4-4c88-8d0c-30c2f3fe0ab0',
        content_title: 'Tập 16B',
        content_type: 'episode',
        has_ads: true,
        progress: '30s',
        quality: 'SD',
        session_id: 1612483772297,
        video_play_type: 'AVOD',
        video_season_name: 'Vẻ Đẹp Đích Thực (True Beauty)'
      },
      context: {
        active: false,
        app: {
          name: 'VieON',
          version: '7.7',
          build: '-1547500244'
        },
        campaign: {
          name: '',
          source: '',
          medium: '',
          term: '',
          content: ''
        },
        device: {
          type: 'ios',
          id: '72D4083F-FCE6-4081-8C66-10801F6EEC22',
          advertisingId: '',
          advertisingEnabled: false,
          manufacturer: 'Apple',
          model: 'iPhone8,1',
          name: 'iPhone'
        },
        ip: '14.251.46.139',
        library: {
          name: 'AicactusSDK-IOS',
          version: '1.0.3'
        },
        locale: 'en-VN',
        location: {
          city: '',
          country: '',
          region: '',
          latitude: '',
          longitude: '',
          speed: ''
        }
      }
    },
    {
      type: 'track',
      anonymousId: '9457A711-5CEE-4765-A539-2A3C552A477A',
      userId: '763422ad-cdb5-9139-cc2f-0ea50721db67',
      event: 'video ended',
      properties: {
        bitrate: '',
        content_id: '55aa05ee-5ec4-4c88-8d0c-30c2f3fe0ab0',
        content_title: 'Tập 18B',
        content_type: 'episode',
        has_ads: true,
        progress: '30s',
        quality: 'SD',
        session_id: 1612483772297,
        video_play_type: 'AVOD',
        video_season_name: 'Vẻ Đẹp Đích Thực (True Beauty)'
      },
      context: {
        active: false,
        app: {
          name: 'VieON',
          version: '7.7',
          build: '-1547500244'
        },
        campaign: {
          name: '',
          source: '',
          medium: '',
          term: '',
          content: ''
        },
        device: {
          type: 'ios',
          id: '72D4083F-FCE6-4081-8C66-10801F6EEC22',
          advertisingId: '',
          advertisingEnabled: false,
          manufacturer: 'Apple',
          model: 'iPhone8,1',
          name: 'iPhone'
        },
        ip: '14.251.46.139',
        library: {
          name: 'AicactusSDK-IOS',
          version: '1.0.3'
        },
        locale: 'en-VN',
        location: {
          city: '',
          country: '',
          region: '',
          latitude: '',
          longitude: '',
          speed: ''
        }
      }
    }
  ],
  log_csv: [
    {
      type: 'track',
      anonymousId: '9457A711-5CEE-4765-A539-2A3C552A477A',
      userId: '763422ad-cdb5-9139-cc2f-0ea50721db67',
      event: 'video progress',
      properties: {
        bitrate: '',
        content_id: '55aa05ee-5ec4-4c88-8d0c-30c2f3fe0ab0',
        content_title: 'Tập 16B',
        content_type: 'episode',
        has_ads: true,
        progress: '30s',
        quality: 'SD',
        session_id: 1612483772297,
        video_play_type: 'AVOD',
        video_season_name: 'Vẻ Đẹp Đích Thực (True Beauty)'
      },
      context: {
        active: false,
        app: {
          name: 'VieON',
          version: '7.7',
          build: '-1547500244'
        },
        campaign: {
          name: '',
          source: '',
          medium: '',
          term: '',
          content: ''
        },
        device: {
          type: 'ios',
          id: '72D4083F-FCE6-4081-8C66-10801F6EEC22',
          advertisingId: '',
          advertisingEnabled: false,
          manufacturer: 'Apple',
          model: 'iPhone8,1',
          name: 'iPhone'
        },
        ip: '14.251.46.139',
        library: {
          name: 'AicactusSDK-IOS',
          version: '1.0.3'
        },
        locale: 'en-VN',
        location: {
          city: '',
          country: '',
          region: '',
          latitude: '',
          longitude: '',
          speed: ''
        }
      }
    },
    {
      type: 'track',
      anonymousId: '9457A711-5CEE-4765-A539-2A3C552A477A',
      userId: '763422ad-cdb5-9139-cc2f-0ea50721db67',
      event: 'video ended',
      properties: {
        bitrate: '',
        content_id: '55aa05ee-5ec4-4c88-8d0c-30c2f3fe0ab0',
        content_title: 'Tập 18B',
        content_type: 'episode',
        has_ads: true,
        progress: '30s',
        quality: 'SD',
        session_id: 1612483772297,
        video_play_type: 'AVOD',
        video_season_name: 'Vẻ Đẹp Đích Thực (True Beauty)'
      },
      context: {
        active: false,
        app: {
          name: 'VieON',
          version: '7.7',
          build: '-1547500244'
        },
        campaign: {
          name: '',
          source: '',
          medium: '',
          term: '',
          content: ''
        },
        device: {
          type: 'ios',
          id: '72D4083F-FCE6-4081-8C66-10801F6EEC22',
          advertisingId: '',
          advertisingEnabled: false,
          manufacturer: 'Apple',
          model: 'iPhone8,1',
          name: 'iPhone'
        },
        ip: '14.251.46.139',
        library: {
          name: 'AicactusSDK-IOS',
          version: '1.0.3'
        },
        locale: 'en-VN',
        location: {
          city: '',
          country: '',
          region: '',
          latitude: '',
          longitude: '',
          speed: ''
        }
      }
    }
  ]
};
