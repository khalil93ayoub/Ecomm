import {
  Children,
  cloneElement,
  isValidElement,
  type CSSProperties,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";

import { staggerClasses } from "@/lib/animations/motion";
import { cn } from "@/lib/utils/cn";

type StaggeredRevealProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function StaggeredReveal({
  children,
  className,
  ...props
}: StaggeredRevealProps) {
  const staggeredChildren = Children.map(children, (child, index) => {
    if (!isValidElement(child)) {
      return child;
    }

    const element = child as ReactElement<{ style?: CSSProperties }>;

    return cloneElement(element, {
      style: {
        ...element.props.style,
        "--motion-index": index,
      } as CSSProperties,
    });
  });

  return (
    <div className={cn(staggerClasses, className)} {...props}>
      {staggeredChildren}
    </div>
  );
}
