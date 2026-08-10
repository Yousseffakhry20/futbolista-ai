import Groq from "groq-sdk";

export interface RenderChartArgs {
  chart_type: "bar" | "line" | "scatter";
  title: string;
  x_key: string;
  y_key: string;
}

export interface RenderChartResult extends RenderChartArgs {
  acknowledged: true;
}

/**
 * This tool does not fetch data. Its only job is to let the model declare
 * chart *intent* (type/axes/title) alongside a getTopPlayers call. The actual
 * data values always come from getTopPlayers's real DB result — never from the
 * model — so the chart can't hallucinate numbers.
 */
export const renderChartToolDef: Groq.Chat.ChatCompletionTool = {
  type: "function",
  function: {
    name: "renderChart",
    description:
      "Declare how the most recent getTopPlayers result should be visualized. " +
      "Call this together with getTopPlayers whenever a chart would help answer the question.",
    parameters: {
      type: "object",
      properties: {
        chart_type: {
          type: "string",
          enum: ["bar", "line", "scatter"],
          description: "bar: ranking/comparison (most common). line: trend across a season/time axis. scatter: relationship between two stats.",
        },
        title: {
          type: "string",
          description: "Short chart title, e.g. 'Top 10 by xG (2025/26)'.",
        },
        x_key: {
          type: "string",
          description: "Field name from the player data to use on the x-axis, e.g. 'name'.",
        },
        y_key: {
          type: "string",
          description: "Field name from the player data to use on the y-axis, e.g. 'value'.",
        },
      },
      required: ["chart_type", "title", "x_key", "y_key"],
    },
  },
};

// No real execution needed — we just echo the args back as the "result"
// so the model's tool-call loop can continue normally.
export function renderChart(args: RenderChartArgs): RenderChartResult {
  return { acknowledged: true, ...args };
}
