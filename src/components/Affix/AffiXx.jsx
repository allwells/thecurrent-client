import { ActionIcon, Affix, Transition } from "@mantine/core";

import { ArrowUpIcon } from "@modulz/radix-icons";
import React from "react";
import { useWindowScroll } from "@mantine/hooks";

const AffiXx = () => {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <>
      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <ActionIcon
              style={transitionStyles}
              variant="default"
              onClick={() => scrollTo({ y: 0 })}
            >
              <ArrowUpIcon size={18} />
            </ActionIcon>
          )}
        </Transition>
      </Affix>
    </>
  );
};

export default AffiXx;
