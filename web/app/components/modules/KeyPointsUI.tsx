"use client";
import React from "react";
import { SanityKeyed } from "sanity-codegen";
import KeyPointItem from "./KeyPointItem";
import { KeyPointsUI } from "@/app/types/schema";
import "./KeyPointsUI.scss";

type Props = {
  input: SanityKeyed<KeyPointsUI>;
};

const ModuleKeyPointsUI = ({ input }: Props) => {
  return (
    <section className='module module--keypoints'>
      <div className='item amorce'>
        <div className='inner'>
          <div className='body'>
            <div className='grid md:grid-cols-12 gap-md'>
              <div className='col-span-3'>
                We Reverse
                <br />
                the way of
              </div>
            </div>
          </div>
        </div>
      </div>
      {input.items?.map((item, index) => (
        <KeyPointItem key={index} input={item} />
      ))}
      <div className='spacer'></div>
    </section>
  );
};

export default ModuleKeyPointsUI;
