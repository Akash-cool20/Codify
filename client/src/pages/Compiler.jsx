import React, { useEffect, useState } from "react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "../components/ui/resizable";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateFullCode, updateIsOwner } from "@/redux/slices/compilerSlice";
import { handleError } from "@/utils/handleError";
import { useLoadCodeMutation } from "@/redux/slices/api";
import Loader from "@/components/Loader/Loader";
import CodeEditor from "../components/CodeEditor";
import HelperHeader from "../components/HelperHeader";
import RenderCode from "@/components/RenderCode";

export default function Compiler() {
  const { urlId } = useParams();
  const windowWidth = useSelector((state) => state.appSlice.currentWidth);
  const [loadExistingCode, { isLoading }] = useLoadCodeMutation();
  const dispatch = useDispatch();

  const loadCode = async () => {
    try {
      if (urlId) {
        const response = await loadExistingCode({ urlId }).unwrap();
        dispatch(updateFullCode(response.fullCode));
        dispatch(updateIsOwner(response.isOwner));
      }
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    if (urlId) {
      loadCode();
    }
  }, [urlId]);

  if (isLoading)
    return (
      <div className="w-full h-[calc(100vh-60px)] flex justify-center items-center">
        <Loader />
      </div>
    );

  // return (
  //   <ResizablePanelGroup
  //     direction={windowWidth > 768 ? "horizontal" : "vertical"}
  //   >
  //     <ResizablePanel
  //       className="h-[calc(100dvh-60px)] min-w-[350px]"
  //       defaultSize={50}
  //     >
  //       <HelperHeader />
  //       <CodeEditor />
  //     </ResizablePanel>
  //     <ResizableHandle />
  //     <ResizablePanel
  //       className="h-[calc(100vh-60px)] min-w-[350px]"
  //       defaultSize={50}
  //     >
  //       <RenderCode />
  //     </ResizablePanel>
  //   </ResizablePanelGroup>
  // );
  return (
    <div className="flex flex-col w-full h-[calc(100vh-60px)]">
      <ResizablePanelGroup direction={windowWidth > 768 ? "horizontal" : "vertical"} className="flex flex-1 w-full h-full">
            <ResizablePanel className="flex-1 min-w-[350px] overflow-auto" defaultSize={50}>
            <HelperHeader />
            <CodeEditor />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel className="flex-1 min-w-[350px] overflow-auto" defaultSize={50}>
              <RenderCode /> 
            </ResizablePanel>
      
      </ResizablePanelGroup>
    </div>
  );
}
