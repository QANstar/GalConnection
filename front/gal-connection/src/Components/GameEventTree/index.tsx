import React, { useCallback, useEffect, useRef } from 'react'
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider
} from 'reactflow'
import 'reactflow/dist/style.css'
import {
  IEdge,
  IEditEventPosition,
  IEvent,
  IEventTreeViewData
} from '../../types/type'
import './index.scss'

interface INode {
  id: string
  type?: string
  data: {
    label: React.ReactNode | string
  }
  position: { x: number; y: number }
}

interface IFlowEdge {
  id: string
  source: string
  target: string
}

interface INewNode {
  pid: number
  EventTreeViewData: IEventTreeViewData
  edge: {
    source: number
  }
}

interface IGameEventTree {
  eventList: IEvent[]
  edgeList: IEdge[]
  onAddNote: (data: INewNode) => void
  onNoteMoved: (data: IEditEventPosition) => void
  onConnect: (data: { source: string; target: string }) => void
  onNoteClick: (id: string) => void
}

const fitViewOptions = {
  padding: 3
}

const GameEventTree = (props: IGameEventTree) => {
  const reactFlowWrapper = useRef(null)
  const connectingNodeId = useRef(null)
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const { project } = useReactFlow()

  const formatEventData = () => {
    const initNodes = props.eventList.map((event) => {
      const nodeData: INode = {
        id: event.id.toString(),
        type: event.isStartEvent ? 'input' : undefined,
        data: {
          label: <div>{event.eventName}</div>
        },
        position: JSON.parse(event.EventTreeViewData.position)
      }
      return nodeData
    })
    setNodes(initNodes as any)
    setEdges(
      props.edgeList.map((edge) => {
        const flowEdge: IFlowEdge = {
          id: edge.edgeId!.toString(),
          source: edge.source.toString(),
          target: edge.target.toString()
        }
        return flowEdge
      })
    )
  }

  const onConnect = useCallback(
    (params: any) => {
      props.onConnect({
        source: params.source,
        target: params.target
      })
      setEdges((eds) => {
        return addEdge(params, eds)
      })
    },
    [edges]
  )

  const onConnectStart = useCallback((_: any, { nodeId }: any) => {
    connectingNodeId.current = nodeId
  }, [])

  const onConnectEnd = useCallback(
    (event: any) => {
      const targetIsPane = event.target.classList.contains('react-flow__pane')
      if (targetIsPane) {
        const { top, left } = (
          reactFlowWrapper.current as any
        ).getBoundingClientRect()
        const newNode: INewNode = {
          pid: connectingNodeId.current as any,
          EventTreeViewData: {
            position: JSON.stringify(
              project({
                x: event.clientX - left - 75,
                y: event.clientY - top
              })
            )
          },
          edge: {
            source: parseInt(connectingNodeId.current!)
          }
        }
        props.onAddNote(newNode)
      }
    },
    [project, nodes, edges]
  )

  useEffect(() => {
    formatEventData()
  }, [props.eventList])

  return (
    <div className="wrapper" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodeDragStop={(_, data) => {
          props.onNoteMoved({
            eventid: parseInt(data.id),
            position: JSON.stringify(data.position)
          })
        }}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        fitView
        fitViewOptions={fitViewOptions}
        onNodeClick={(_, data) => {
          props.onNoteClick(data.id)
        }}
      />
    </div>
  )
}

// eslint-disable-next-line react/display-name
export default (props: IGameEventTree) => (
  <ReactFlowProvider>
    <GameEventTree {...props} />
  </ReactFlowProvider>
)
