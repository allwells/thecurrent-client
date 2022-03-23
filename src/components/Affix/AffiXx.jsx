import { Affix, Button, Transition } from "@mantine/core";

import { ArrowUpIcon } from "@modulz/radix-icons";
import React from "react";
import { useWindowScroll } from "@mantine/hooks";

const AffiXx = () => {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <>
      <Affix
        style={{ border: "1px solid #f5f5f5", borderRadius: "4px" }}
        position={{ bottom: 20, right: 20 }}
      >
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <Button
              leftIcon={<ArrowUpIcon />}
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
            >
              Scroll to top
            </Button>
          )}
        </Transition>
      </Affix>
    </>
  );
};

export default AffiXx;
