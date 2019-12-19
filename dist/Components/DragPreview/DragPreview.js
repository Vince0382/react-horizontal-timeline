import React from 'react';
import { useDragLayer } from 'react-dnd';
import { ELEMENT } from '../../Constants/Constants';
import classes from './DragPreview.module.css';

var getItemStyles = function getItemStyles(initialOffset, currentOffset) {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none'
    };
  }

  var x = currentOffset.x,
      y = currentOffset.y;
  var transform = "translate(".concat(x, "px, ").concat(y, "px)");
  return {
    transform: transform,
    WebkitTransform: transform
  };
};

var DragPreview = function DragPreview(props) {
  var _useDragLayer = useDragLayer(function (monitor) {
    return {
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging()
    };
  }),
      itemType = _useDragLayer.itemType,
      isDragging = _useDragLayer.isDragging,
      item = _useDragLayer.item,
      initialOffset = _useDragLayer.initialOffset,
      currentOffset = _useDragLayer.currentOffset;

  var renderItem = function renderItem() {
    switch (itemType) {
      case ELEMENT:
        return React.createElement("img", {
          className: classes.ImageSytle,
          src: item.content.logo,
          alt: ""
        });

      default:
        return null;
    }
  };

  if (!isDragging || item.id) {
    return null;
  }

  return React.createElement("div", {
    className: classes.DragPreview
  }, React.createElement("div", {
    className: classes.ItemStyle,
    style: getItemStyles(initialOffset, currentOffset)
  }, renderItem()));
};

export default DragPreview;