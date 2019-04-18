import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { MdArrowForward } from 'react-icons/md';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import {Toolbar,Typography,Tooltip,IconButton} from '@material-ui/core';

class EnhancedTableToolbar extends React.Component {
  constructor(props) {
    super(props)
    this.selected = []
  }

  componentWillReceiveProps(nextprops){
    if(this.selected !== nextprops.selected){
      this.selected = nextprops.selected
    }
  }

  render() {
    const { numSelected, classes, SeeData } = this.props;
  
    return (
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography color="inherit" variant="subtitle1">
              {numSelected} deal sélectionné{numSelected>1?'s':null}
            </Typography>
          ) : (
            <Typography variant="h6" id="tableTitle">
              Deals Chauds
            </Typography>
          )}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {numSelected > 0 ? 
            <Tooltip title="Voir" onClick={()=>SeeData(this.selected)}>
              <IconButton aria-label="Voir">
                <MdArrowForward/>
              </IconButton>
            </Tooltip>
          :
          null
              /* <Tooltip title="Filtrer">
                <IconButton aria-label="Filtrer">
                  <MdFilterList />
                </IconButton>
              </Tooltip> */
            }
        </div>
      </Toolbar>
    );
  }
};
  
  EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
  };

  const toolbarStyles = theme => ({
    root: {
      paddingRight: theme.spacing.unit,
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    spacer: {
      flex: '1 1 100%',
    },
    actions: {
      color: theme.palette.text.secondary,
    },
    title: {
      flex: '0 0 auto',
    },
  });

  export default withStyles(toolbarStyles)(EnhancedTableToolbar);