import annotationsStore from './annotations';

const stores = {
  annotationsStore,
  all: () => {
    annotationsStore();
  },
};

export default stores;
