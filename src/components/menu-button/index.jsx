import React, { useState } from "react";
import PropTypes from "prop-types";
import { usePopper } from "react-popper";
import { MdMoreVert } from "react-icons/md";
import ClickAwayListener from "react-click-away-listener";
import menuStyles from "./menu-button.module.scss";

const MenuButton = ({ items }) => {
  const [show, setShow] = useState(false);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{}],
    strategy: "fixed",
    placement: "bottom-end",
  });
  return (
    <>
      <ClickAwayListener onClickAway={() => setShow(false)}>
        <button
          onClick={() => setShow(!show)}
          className={menuStyles.button}
          type="button"
          ref={setReferenceElement}
        >
          <MdMoreVert size={24} />
        </button>

        {show && (
          <button
            className="card"
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
            onClick={() => setShow(!show)}
          >
            {items}
          </button>
        )}
      </ClickAwayListener>
    </>
  );
};

MenuButton.propTypes = {
  items: PropTypes.arrayOf(PropTypes.node),
};

export default MenuButton;
