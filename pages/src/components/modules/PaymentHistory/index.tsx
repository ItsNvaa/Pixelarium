"use client";

import { HeadingFour, HeadingTwo } from "@/components/ui/Typographies/Heading";
import MutedText from "@/components/ui/Typographies/MutedText";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React, { use, useEffect, useState } from "react";
import Paragraph from "@/components/ui/Typographies/Paragraph";
import { FiActivity } from "react-icons/fi";
import { HiCalendar, HiHeart } from "react-icons/hi";
import PaymentHistoryCardProps from "@/components/interfaces/types/PaymentHistoryCard";
import getUserSubscriptionStatus, {
  GetUserSubscriptionStatusReturnType,
} from "@/services/getUserSubscriptionStatus";
import { Skeleton } from "@/components/ui/skeleton";
import capitalize from "capitalize";
import moment from "moment";

export default function PaymentHistory(): React.ReactElement {
  return (
    <main className="flex h-full w-[97%] flex-col gap-4 pt-12">
      <PaymentHistoryHeader />
      <PaymentHistoryCards />
    </main>
  );
}

function PaymentHistoryHeader(): React.ReactElement {
  return (
    <section className="flex flex-col gap-1">
      <HeadingTwo className="text-4xl font-extrabold">
        Your Payment History
      </HeadingTwo>
      <div className="flex items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <InfoCircledIcon className="mr-1 h-4 w-4 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <Paragraph>
                This functionality enables individuals to review and track their
                financial activities over a specific period of time.
              </Paragraph>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <MutedText className="font-medium">
          View your Transaction History
        </MutedText>
      </div>
    </section>
  );
}

const subscriptionQuery: Promise<GetUserSubscriptionStatusReturnType | null> =
  getUserSubscriptionStatus();
function PaymentHistoryCards(): React.ReactElement {
  const [nextPaymentDate, setNextPaymentDate] = useState<string>("");

  const subscription: GetUserSubscriptionStatusReturnType | null =
    use(subscriptionQuery);
  const subscriptionNextPaymentDate: Date | undefined =
    subscription?.status.next_payment_date;

  const isActivated: string =
    subscription?.status.status == "active" ? "Activ" : "Inactive";

  const userPlan: string = subscription?.status.plan
    ? capitalize(subscription?.status.plan as string)
    : (subscription?.status.plan as string);

  useEffect(() => {
    if (!subscriptionNextPaymentDate) {
      setNextPaymentDate("-");
      return;
    }

    const unixNextPaymentDate: number = new Date(
      subscriptionNextPaymentDate,
    ).getTime();
    const formattedDate: string = moment(unixNextPaymentDate).format("LL");
    console.log(formattedDate);
  }, [subscriptionNextPaymentDate]);

  console.log(nextPaymentDate);

  return (
    <section className="relative mt-3 grid grid-cols-3 place-items-start justify-start">
      <PaymentHistoryCard
        subs={subscription?.status}
        Icon={<FiActivity className="h-[1.1rem] w-[1.1rem]" />}
        title="Subscription Status"
        tooltipContent="Your Subscription Status"
        description="You have been subscribed since July 2022."
        content={isActivated}
      />
      <PaymentHistoryCard
        subs={subscription?.status}
        Icon={<HiHeart className="h-[1.2rem] w-[1.2rem]" />}
        title="Your Plan"
        tooltipContent="Your Subscription Plan"
        description="You have been subscribed since July 2022."
        content={userPlan}
      />
      <PaymentHistoryCard
        subs={subscription?.status}
        Icon={<HiCalendar className="h-[1.2rem] w-[1.2rem]" />}
        title="Next Payment Date"
        tooltipContent="Your Next Payment Date"
        description="You have been subscribed since July 2022."
        content={nextPaymentDate}
      />
    </section>
  );
}

function PaymentHistoryCard({
  Icon,
  content,
  description,
  title,
  tooltipContent,
  subs,
}: PaymentHistoryCardProps): React.ReactElement {
  return (
    <>
      {!subs ? (
        <Skeleton className="h-[9.5rem] w-[21rem] rounded-lg " />
      ) : (
        <div className="flex h-[9.5rem] w-[21rem] cursor-pointer flex-col gap-1 rounded-lg border p-5 hover:bg-primary-foreground/50">
          <div className="flex items-center justify-between">
            <HeadingFour>{title}</HeadingFour>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>{Icon}</TooltipTrigger>
                <TooltipContent className="relative z-10">
                  <Paragraph>{tooltipContent}</Paragraph>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="pt-2">
            <HeadingTwo className="font-extrabold">{content}</HeadingTwo>
            <MutedText>{description}</MutedText>
          </div>
        </div>
      )}
    </>
  );
}