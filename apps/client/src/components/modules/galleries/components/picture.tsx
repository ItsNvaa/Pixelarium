"use client";

import moment from "moment";
import capitalize from "capitalize";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/black-and-white.css";
import onErrorHandler from "../../../../utils/on-error-picture-handler";
import type { default as IPicture } from "@/components/interfaces/types/Picture";
import EmptyPictures from "./empty-pictures";
import Paragraph from "@/components/molecules/typographies/paragraph";
import sortPicture from "../utils/sort-picture";
import { parseAsStringLiteral, useQueryState } from "nuqs";
import sortBy from "@/constant/readonly/sort-by";

interface PictureProps extends React.ComponentProps<"div"> {
  pictures: Array<IPicture> | undefined;
}

export default function Picture({
  pictures,
}: PictureProps): Array<React.ReactElement> | React.ReactElement {
  const [pictureSortBy] = useQueryState(
    "sort_by",
    parseAsStringLiteral(sortBy).withDefault("recent"),
  );

  const sortedPictures: Array<IPicture> | undefined = sortPicture({
    array: pictures,
    by: pictureSortBy,
  });

  if (!pictures?.length) return <EmptyPictures />;

  return (
    <section className="grid grid-cols-2 gap-3 @container @2xl:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {sortedPictures?.map((p, i) => (
        <HoverCardPicture
          picture={p}
          key={i}
          title={`${capitalize(p.title)} - ${capitalize(p.description)}`}
        >
          <div className="relative flex h-[9rem] w-full cursor-pointer items-center justify-center overflow-hidden rounded border bg-primary/5 transition-all @sm:h-[10rem] @md:h-[12rem] @xl:h-[13.5rem] hover:bg-primary/10 hover:grayscale">
            <LazyLoadImage
              src={p.url}
              className="h-[9rem] w-full rounded bg-center object-cover bg-blend-overlay shadow-md @sm:h-[10rem] @md:h-[12rem] @xl:h-[13.5rem]"
              alt={capitalize(p.title)}
              title={capitalize(p.title)}
              effect="black-and-white"
              onError={({
                target,
              }: React.SyntheticEvent<HTMLImageElement, Event>) =>
                onErrorHandler(target)
              }
            />
          </div>
        </HoverCardPicture>
      ))}
    </section>
  );
}

interface HoverCardPictureProps extends React.ComponentProps<"div"> {
  picture: IPicture;
}

function HoverCardPicture({
  children,
  picture,
}: HoverCardPictureProps): React.ReactElement {
  const [pictureExpires, setPictureExpires] = useState<string>("Forever");
  const createdAt: number = new Date(new Date(picture.createdAt)).getTime();
  const formattedCreatedAtDate: string = moment(createdAt).format("LLL");
  const expiresIn: number | null | undefined = picture.expires_in;

  useEffect(() => {
    if (expiresIn) {
      const pictureCreatedDate: Date = new Date(picture.createdAt);
      const pictureExpiresIn: number = pictureCreatedDate.setDate(
        pictureCreatedDate.getDate() + expiresIn,
      );
      const formattedDate: string = moment(pictureExpiresIn).format("LLL");

      setPictureExpires(formattedDate);
    }

    return () => setPictureExpires("Forever");
  }, [expiresIn, picture.createdAt]);

  return (
    <HoverCard>
      <HoverCardTrigger>{children}</HoverCardTrigger>
      <HoverCardContent className="relative z-50 flex h-full justify-start gap-2 bg-background">
        <div className="flex w-56 flex-col gap-1">
          <Paragraph className="overflow-hidden text-ellipsis text-wrap text-base font-medium">
            {picture.title} - ({picture.filename})
          </Paragraph>
          <Paragraph className="overflow-hidden text-ellipsis text-sm font-medium text-primary/50">
            {picture.description && "This picture doesn't have a description"}
          </Paragraph>
          <Paragraph className="text-sm font-medium text-primary/50">
            ({picture.is_private ? "Private" : "Public"}){" "}
            {formattedCreatedAtDate} - {pictureExpires}
          </Paragraph>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}