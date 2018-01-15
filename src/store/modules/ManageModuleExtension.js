
export default class ManageModuleExtension {
    constructor(firebaseRepository) {
        this.firebaseRepository = firebaseRepository;
    }

    get() {

        const self = this;

        return {
            namespaced: true,
            state: {
                assets: []
            },
            mutations: {
                setAssetsData: (state, assetsData) => {
                    state.assets = assetsData.map(a => {
                        a.editing = false
                        return a
                    })
                },
                toggleEditedAsset: (state, { assetId, editing }) => {
                    var asset = state.assets.find(a => {
                        return a.id === assetId
                    });

                    asset.editing = !asset.editing;
                },
                updateAsset: (state, { assetId, coinCount, investment }) => {
                    var asset = state.assets.find(a => {
                        return a.id === assetId
                    });

                    asset.coinCount = coinCount;
                    asset.investment = investment;
                }
            },
            actions: {
                setDataAsync({ commit, rootState }) {
                    var assetsArray = JSON.parse(JSON.stringify(rootState.assets.basicAssets));
                    commit("setAssetsData", assetsArray);
                    return assetsArray;
                }
            }
        }
    }
}