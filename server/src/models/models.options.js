const modelOptions = {
  toJson: {
    virtual: true, //表示在轉換的過程中也包含虛擬字段。
    transform: (_, obj) => {
      //函式定義了在轉換過程中如何處理轉換後的物件。轉換後的物件中刪除 _id 屬性。
      delete obj._id;
      return obj;
    },
  },
  toObject: {
    virtual: true,
    transform: (_, obj) => {
      delete obj._id;
      return obj;
    },
  },
  versionKey: false, //表示在模型中不包含 __v 版本鍵。
  timestamps: true, //表示在模型中包含 createdAt 和 updatedAt 時間戳。
};

export default modelOptions;
