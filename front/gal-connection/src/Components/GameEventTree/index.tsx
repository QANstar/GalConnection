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

interface IEdge {
  id: string
  source: string
  target: string
}

interface INewNode {
  pid: number
  EventTreeViewData: IEventTreeViewData
}

interface IGameEventTree {
  eventList: IEvent[]
  onAddNote: (data: INewNode) => void
  onNoteMoved: (data: IEditEventPosition) => void
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
        type: event.pid === 0 ? 'input' : undefined,
        data: {
          label: <div>{event.eventName}</div>
        },
        position: JSON.parse(event.EventTreeViewData.position)
      }
      return nodeData
    })
    setNodes(initNodes as any)
    const initEdges: IEdge[] = []
    for (const event of props.eventList) {
      if (event.pid !== 0) {
        const edge: IEdge = {
          id: event.id.toString(),
          source: event.pid.toString(),
          target: event.id.toString()
        }
        initEdges.push(edge)
      }
    }
    setEdges(initEdges)
  }

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    []
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
          }
        }
        props.onAddNote(newNode)
      }
    },
    [project]
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
          console.log(data)

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
          console.log(data)
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
