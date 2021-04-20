const styles = {
  content: {
    minHeight: '100vh',
    marginLeft: '320px'
  },
  titleCard: {
    padding: '10px',
    margin: '10px',
    boxShadow: '0px 0px 5px 6px #dcdee2',
    height: 'auto',
    width: '60vw',
    overflow: 'hidden',
    background: '#f8f8f9',
    '&:hover': {
      boxShadow: '0px 0px 2px 3px #2b85e4',
    },
    '&*': {
      background: '#f8f8f9',
    },
    '&*:focus': {
      outline: 'none',
      border: '1px solid #dcdee2',
      background: '#e8eaec',
      padding: '10px',
    },
  },
  titleText: {
    fontSize: '28px',
    textAlign: 'center',
    margin: '10px',
    width: '97%',
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: '19px',
    margin: '10px',
    width: '97%',
  },
  questionCard: {
    background: '#f8f8f9',
    padding: '10px',
    margin: '10px',
    boxShadow: '0px 0px 5px 6px #dcdee2',
    height: 'auto',
    width: '60vw',
    '&:hover': {
      boxShadow: '0px 0px 2px 3px #2b85e4',
    },
  },
  questionTitle: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    // float: 'left',
  },
  questionSortNum: {
    display: 'block',
    fontSize: '16px',
    width: '1%',
    marginLeft: '1%',
    fontWeight: 'bold',
  },
  questionTitleText: {
    width: '77%',
    fontSize: '24px',
    marginLeft: '1%',
  },
  operationBtns: {
    paddingLeft: '1%',
    display: 'inline-block',
    '&>*': {
      marginTop: '4px',
      marginLeft: '10px',
    },
  },
  optionDiv: {
    width: '80%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '50px',
    marginTop: '5px',
    marginBottom: '-8px',
  },
  weightDiv: {
    marginTop: '10px',
    width: '100%',
  },
  optionRadio: {
    marginLeft: '8%',
    display: 'flex',
    alignItems: 'center',
  },
  optionMulti: {
    marginLeft: '8%',
    display: 'flex',
    alignItems: 'center',
  },
  newOptionAdd: {
    marginLeft: '5%',
    marginTop: '15px',
  },
  blankText: {
    width: '77%',
    marginLeft: '5%',
    marginTop: '10px',
    marginBottom: '10px',
  },
  slider: {
    width: '76.5%',
    marginLeft: '3.5%',
    marginTop: '25px',
  },
  itemSelect: {
    position: 'fixed',
    right: '10%',
    width: '100px',
    overflow: 'auto',
    maxHeight: '300px',
    bottom: '50px',
  },
  itemList: {
    '&:hover': {
      background: '#3399ff',
      cursor: 'pointer',
    },
  },
  active: {
    background: '#3399ff',
  },
};
export default styles;
